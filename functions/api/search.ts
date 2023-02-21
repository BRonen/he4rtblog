import type { ArticleSearchIndex } from '../../src/schemas/search';
import { distance } from 'fastest-levenshtein';

interface Env {
    HE4RT_SEARCH_INDEXES: KVNamespace;
}

const MIN_QUERY_LENGTH = 1;
const MAX_QUERY_LENGTH = 45;
const MAX_QUERY_WORDS = 10;
const MAX_RESULTS = 4;

const WORD_SCORE_THRESHOLD = 0.6;
const TITLE_SCORE_THRESHOLD = 0.6;
const SAME_INDEX_THRESHOLD = 0.75;

const SAME_INDEX_BONUS = 0.5;
const EXACT_MATCH_BONUS = 0.5;

export const onRequestPost: PagesFunction<Env> = async (context) => {
    const body: { query?: string } = await context.request.json();

    if (!body.query || typeof body.query !== "string") {
        return new Response(JSON.stringify({ message: 'The body of the request must have a "query" key with a string value.' }), { status: 400 });
    }

    return new Response(JSON.stringify(await searchArticles(body.query, context.env.HE4RT_SEARCH_INDEXES)));
}

async function searchArticles(query: string, kv: KVNamespace): Promise<ArticleSearchIndex[]> {
    if (query.length < MIN_QUERY_LENGTH && query.length > MAX_QUERY_LENGTH) {
        return [];
    }

    const treatedQuery = query.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const queryWords = treatedQuery.split(' ');

    if (queryWords.length > MAX_QUERY_WORDS) {
        return [];
    }

    const articleIndexes = JSON.parse(await kv.get('posts', { cacheTtl: 600 }) ?? "[]") as ArticleSearchIndex[];
    return articleIndexes.map(index => ({
        ...index,
        score: calculateTitleScore(queryWords, index.titleWords)
    })).filter(entry => entry.score > 0).sort((a, b) => b.score - a.score).slice(0, MAX_RESULTS);
}

function calculateTitleScore(queryWords: string[], titleWords: string[]): number {
    const queryWordCount = queryWords.length;
    let titleScore = 0;

    for (let i = 0; i < queryWordCount; i++) {
        const queryWord = queryWords[i];

        for (let j = 0; j < titleWords.length; j++) {
            const titleWord = titleWords[j];
            const levenshteinDistance = distance(queryWord, titleWord);
            const wordScore = titleWord.length / (titleWord.length + levenshteinDistance);
            let finalWordScore = wordScore;

            if (j == i && wordScore > SAME_INDEX_THRESHOLD) {
                finalWordScore += SAME_INDEX_BONUS;
            }

            if (wordScore === 1) {
                finalWordScore += EXACT_MATCH_BONUS;
            }

            titleScore += wordScore < WORD_SCORE_THRESHOLD ? 0 : finalWordScore;
        }
    }

    return titleScore / queryWordCount < TITLE_SCORE_THRESHOLD ? 0 : titleScore;
}
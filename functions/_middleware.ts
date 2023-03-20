import { parse } from 'cookie';

export const COLOR_SCHEME_COOKIE = 'colorScheme';
export const COLOR_SCHEME_BODY_ATTRIBUTE = 'data-color-scheme';
export type ColorSchemeValue = 'light' | 'dark';

export const onRequest: PagesFunction = async (context) => {
    const cookie = parse(context.request.headers.get('Cookie') ?? '');
    const colorScheme = cookie[COLOR_SCHEME_COOKIE];
    
    class ElementHandler {
        element(element: Element) {
            if(element.tagName === 'body') {
                element.setAttribute(COLOR_SCHEME_BODY_ATTRIBUTE, colorScheme);
            }
        }
    }

    if(colorScheme === 'light' || colorScheme === 'dark') {
        return new HTMLRewriter().on('body', new ElementHandler()).transform(await context.next());
    }
    
    return context.next();
}
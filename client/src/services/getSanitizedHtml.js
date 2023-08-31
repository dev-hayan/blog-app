import * as DOMPurify from 'dompurify';


export default function createMarkup(html) {
    return {
        __html: DOMPurify.sanitize(html)
    }
}
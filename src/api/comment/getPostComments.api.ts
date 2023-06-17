import { commentSchemasManager } from '@/schemas';
import { API_URL, customHeaders } from '../utils';

export const getPostComments = async (pid: string) => {
    const response = await fetch(`${API_URL}/posts/${pid}/comments`, {
        headers: customHeaders,
    });

    const data = await response.json();

    const parseResult = commentSchemasManager.responseBody.list.parse(data);

    return parseResult;
};

import { fromApiError } from '@/error';
import { postSchemasManager } from '@/schemas';
import { API_URL, customHeaders } from '../utils';

export const getPost = async (id: string) => {
    const response = await fetch(`${API_URL}/posts/${id}`, {
        headers: customHeaders,
    });

    const data = await response.json();

    if (!response.ok) {
        throw fromApiError(data);
    }

    const parseResult = postSchemasManager.post.parse(data);

    return parseResult;
};

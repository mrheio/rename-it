import { fromApiError } from '@/error';
import { postSchemasManager } from '@/schemas';
import { API_URL, customHeaders } from '../utils';

export const getPosts = async () => {
    const response = await fetch(`${API_URL}/posts`, {
        headers: customHeaders,
    });

    const data = await response.json();

    if (!response.ok) {
        throw fromApiError(data);
    }

    const parseResult = postSchemasManager.responseBody.list.parse(data);

    return parseResult;
};

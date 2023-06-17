import { fromApiError } from '@/error';
import { communitySchemasManager } from '@/schemas';
import { API_URL, customHeaders } from '../utils';

export const getCommunities = async () => {
    const response = await fetch(`${API_URL}/communities`, {
        headers: customHeaders,
    });

    const data = await response.json();

    if (!response.ok) {
        throw fromApiError(data);
    }

    const parseResult = communitySchemasManager.responseBody.list.parse(data);

    return parseResult;
};

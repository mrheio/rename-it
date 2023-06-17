import { fromApiError } from '@/error';
import { communitySchemasManager } from '@/schemas';
import { API_URL, customHeaders } from '../utils';

export const getCommunity = async (cid: string) => {
    const response = await fetch(`${API_URL}/communities/${cid}`, {
        headers: customHeaders,
    });

    const data = await response.json();

    if (!response.ok) {
        throw fromApiError(data);
    }

    const parseResult = communitySchemasManager.community.parse(data);

    return parseResult;
};

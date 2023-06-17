import { z } from 'zod';
import { communitySchemasManager } from './community.schema';

export type Community = z.infer<typeof communitySchemasManager.community>;

export type CommunityStatistics = z.infer<
    typeof communitySchemasManager.communityStatistics
>;

export type DetailedCommunity = z.infer<
    typeof communitySchemasManager.detailedCommunity
>;

export type CommunityRequestBody = z.infer<
    typeof communitySchemasManager.requestBody.community
>;

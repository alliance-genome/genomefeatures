import { SimpleFeatureSerialized } from './services/types';
import { Region } from './types';
export declare function fetchTabixGffData({ url, indexUrl, indexType, region, }: {
    url: string;
    indexUrl?: string;
    indexType?: string;
    region: Region;
}): Promise<SimpleFeatureSerialized[]>;

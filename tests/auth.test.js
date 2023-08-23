import { describe, expect, test } from 'vitest';
import { API_URL } from './helpers';

describe('Authentication Scenarios', () => {
    test('given correct user data when user registers then response contains a message and a payload', async () => {
        const userData = {
            username: 'test',
            email: 'test@test.com',
            password: 'test',
        };

        const result = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            body: JSON.stringify(userData),
        });

        const body = await result.json();

        expect(body).toHaveProperty('type');
        expect(body).toHaveProperty('message');
        expect(body).toHaveProperty('payload');
    });
});

import { auth } from "../firebase-config";

describe('auth should exist', () => {
    it('should exist', () => {
     expect(auth).toBeDefined;
    });
});
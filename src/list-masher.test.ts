import { encode, decode } from './list-masher';

describe('list-masher', () => {
	describe('encode', () => {
		it('should encode arrays', () => {
			expect(encode(
				['some', 'mock', '', 'data']
			)).toEqual('BABzbQBkb29hbWN0ZWth');

			expect(encode(
				['more', 'values'],
				{ skipSize: true }
			)).toEqual('bXZvYXJsZXUAZXM');
		});
	});

	describe('decode', () => {
		it('should decode a string', () => {
			expect(decode('BABzbQBkb29hbWN0ZWth')).toEqual(
				['some', 'mock', '', 'data']
			);

			expect(decode('bXZvYXJsZXUAZXM', 2)).toEqual(
				['more', 'values'],
			);

			expect(decode('A', 1)).toEqual([''])
		});
	});
});

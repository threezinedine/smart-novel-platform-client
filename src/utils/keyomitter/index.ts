type KeyOmitterType = {
	[key: string]: any;
};

const KeyOmitter = (obj: KeyOmitterType) => {
	return {
		except: (...keys: string[]) => {
			const result = { ...obj };
			for (const key of keys) {
				delete result[key];
			}
			return result;
		},
	};
};

export default KeyOmitter;

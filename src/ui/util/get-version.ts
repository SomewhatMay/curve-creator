import config from "config";

export function getVersion() {
	return `v${config.version.major}.${config.version.minor}.${config.version.patch}`;
}

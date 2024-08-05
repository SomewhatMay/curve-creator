--[[
 * This function allows you to load a module script
 * cleanly, ignoring all previously loaded versions
 * that Roblox's require function has automatically cached.

 * Useful when you need to access the data of a
 * ModuleScript after its source has changed.

 * Credit here:
 *	https://devforum.roblox.com/t/is-there-an-easier-way-to-reload-modules-that-have-been-required/61917/8
 * Modified by SomewhatMay
 * ]]--


local function cleanRequire(module: ModuleScript)
	local source, errorMessage = loadstring(module.Source)
	assert(source,`A parsing error occurred while loading {module:GetFullName()}: {errorMessage}`)

	local env = setmetatable({
		script = module;
		require = cleanRequire;
	}, { __index = getfenv() })

	local success, data = pcall(setfenv(source, env))
	assert(success,`An error occurred while executing {module:GetFullName()}: {data}`)

	return data
end

return {
	cleanRequire = cleanRequire;
}
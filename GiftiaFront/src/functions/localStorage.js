export const saveItem = (key, value) => {
	localStorage.setItem(key, JSON.stringify(value))
    console.log(`${key} saved`)
}

export const getItem = (key) => {
	return JSON.parse(localStorage.getItem(key))
}

export const removeItem = (key) => {
	localStorage.removeItem(key)
}
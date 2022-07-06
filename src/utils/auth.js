export function getCurrentAuthority() {
  // return ["admin"]
  return ["admin"]
}

export function check(authority) {
  const current = getCurrentAuthority();
  console.log(authority, current, current.some(item => authority.includes(item)))
  
  return current.some(item => authority.includes(item));
}

export function isLogin () {
  const current = getCurrentAuthority();
  return current && current[0] !== "guest";
}
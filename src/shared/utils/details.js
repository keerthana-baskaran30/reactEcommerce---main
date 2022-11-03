function getDetail(data) {
  return localStorage.getItem(data);
}

export function removeDetail() {
  localStorage.removeItem("username");
  localStorage.removeItem("role");
  localStorage.removeItem("email");
}
export default getDetail;

export const dataTemplate = (data) => {
  return data.reduce((acc, crr) => {
    return acc += `    
    <tr calss="table-detail">
      <td>title </td>
      <td>${crr.title}</td>
    </tr>
    `
  }, '');
}
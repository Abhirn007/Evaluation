<script>
document.addEventListener('DOMContentLoaded', function() {
  const baseUrl = 'https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-employees';
  let currentPage = 1;
  let currentLimit = 10;
  let currentFilterBy = '';
  let currentFilterValue = '';
  let currentSort = '';
  let currentOrder = '';

  const departmentFilter = document.getElementById('departmentFilter');
  const genderFilter = document.getElementById('genderFilter');
  const sortOrder = document.getElementById('sortOrder');
  const employeeTable = document.getElementById('employeeTable');
  const employeeList = document.getElementById('employeeList');
  const prevPageBtn = document.getElementById('prevPage');
  const nextPageBtn = document.getElementById('nextPage');

  // Fetch employees data
  function fetchEmployees() {
    const url = ${baseUrl}?page=${currentPage}&limit=${currentLimit}&filterBy=${currentFilterBy}&filterValue=${currentFilterValue}&sort=${currentSort}&order=${currentOrder};

    fetch(url)
      .then(response => response.json())
      .then(data => populateTable(data))
      .catch(error => console.error('Error fetching data:', error));
  }

  // Populate employee table
  function populateTable(data) {
    // Clear existing table data
    employeeList.innerHTML = '';

    // Populate table rows with employee data
    data.forEach((employee, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${employee.name}</td>
        <td>${employee.gender}</td>
        <td>${employee.department}</td>
        <td>${employee.salary}</td>
      `;
      employeeList.appendChild(row);
    });
  }

  // Pagination
  function updatePaginationButtons() {
    prevPageBtn.disabled = currentPage === 1;
    // Assuming total pages are unknown, so just disabling next button for now
    nextPageBtn.disabled = false;
  }

  prevPageBtn.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      fetchEmployees();
      updatePaginationButtons();
    }
  });

  nextPageBtn.addEventListener('click', () => {
    currentPage++;
    fetchEmployees();
    updatePaginationButtons();
  });

  // Event listeners for filter and sort dropdowns
  departmentFilter.addEventListener('change', () => {
    currentFilterBy = 'department';
    currentFilterValue = departmentFilter.value;
    currentPage = 1;
    fetchEmployees();
    updatePaginationButtons();
  });

  genderFilter.addEventListener('change', () => {
    currentFilterBy = 'gender';
    currentFilterValue = genderFilter.value;
    currentPage = 1;
    fetchEmployees();
    updatePaginationButtons();
  });

  sortOrder.addEventListener('change', () => {
    currentSort = 'salary';
    currentOrder = sortOrder.value;
    currentPage = 1;
    fetchEmployees();
    updatePaginationButtons();
  });

  // Initial fetch
  fetchEmployees();
  updatePaginationButtons();
});
</script>
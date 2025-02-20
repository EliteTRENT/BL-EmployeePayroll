$(document).ready(function () {
    let $employeeTableBody = $(".emp-dash-table-body");
    let $addUserButton = $(".emp-dash-nav-add-user button");
    let $searchBox = $("#emp-dash-main-search-box");

    function loadEmployees() {
        let employees = JSON.parse(localStorage.getItem("employees")) || [];
        $employeeTableBody.empty();

        employees.forEach((employee, index) => {
            let $row = $(`
                <tr>
                    <td>
                        <div class="emp-dash-table-body-img">
                            <img src="${employee.profileImage}" alt="Employee Photo">
                            <span>${employee.name}</span>
                        </div>
                    </td>
                    <td>${employee.gender}</td>
                    <td>${employee.departments.join(", ")}</td>
                    <td>${employee.salary}</td>
                    <td>${employee.startDate}</td>
                    <td class="emp-actions">
                        <i class="fa-solid fa-pen edit-btn" data-index="${index}"></i>
                        <i class="fa-solid fa-trash delete-btn" data-index="${index}"></i>
                    </td>
                </tr>
            `);
            $employeeTableBody.append($row);
        });

        $(".delete-btn").on("click", deleteEmployee);
        $(".edit-btn").on("click", editEmployee);
    }

    function addEmployee() {
        localStorage.removeItem("editEmployee");
        window.location.href = "./empRegister.html";
    }

    function deleteEmployee() {
        let index = $(this).data("index");
        let employees = JSON.parse(localStorage.getItem("employees")) || [];

        employees.splice(index, 1);
        localStorage.setItem("employees", JSON.stringify(employees));

        loadEmployees();
    }

    function editEmployee() {
        let index = $(this).data("index");
        let employees = JSON.parse(localStorage.getItem("employees")) || [];
        let employee = employees[index];

        localStorage.setItem("editEmployee", JSON.stringify({ employee, index }));
        window.location.href = "./empRegister.html";
    }

    function searchByName() {
        let searchValue = $searchBox.val().toLowerCase();
        let employees = JSON.parse(localStorage.getItem("employees")) || [];
        let hasMatch = false;

        $employeeTableBody.empty();

        employees.forEach((employee, index) => {
            if (employee.name.toLowerCase().includes(searchValue)) {
                let $row = $(`
                    <tr>
                        <td>
                            <div class="emp-dash-table-body-img">
                                <img src="${employee.profileImage}" alt="Employee Photo">
                                <span>${employee.name}</span>
                            </div>
                        </td>
                        <td>${employee.gender}</td>
                        <td>${employee.departments.join(", ")}</td>
                        <td>${employee.salary}</td>
                        <td>${employee.startDate}</td>
                        <td class="emp-actions">
                            <i class="fa-solid fa-pen edit-btn" data-index="${index}"></i>
                            <i class="fa-solid fa-trash delete-btn" data-index="${index}"></i>
                        </td>
                    </tr>
                `);
                $employeeTableBody.append($row);
                hasMatch = true;
            }
        });

        if (!hasMatch) {
            $employeeTableBody.html(`
                <tr id="no-match-message">
                    <td colspan="6" style="text-align: center; font-weight: bold; color: red;">
                        No matches found
                    </td>
                </tr>
            `);
        } else {
            attachEventListeners();
        }
    }

    function attachEventListeners() {
        $(".delete-btn").on("click", deleteEmployee);
        $(".edit-btn").on("click", editEmployee);
    }

    $addUserButton.on("click", addEmployee);
    $searchBox.on("input", searchByName);

    loadEmployees();
});

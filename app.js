let body = document.querySelector('div');
let Tbody = document.querySelector('.Tbody');
let addCourseForm = document.getElementById('add-course-form');
let saveCourseBtn = document.getElementById('save-course-btn');

// Fetch and display courses
fetch('http://localhost:3002/api/courses')
    .then((res) => res.json())
    .then((data) => {
        let newCourses = data.data.courses;
        newCourses.forEach((ele, index) => {
            Tbody.innerHTML += `
        <tr id="${ele._id}">
            <th scope="row">${index + 1}</th>
            <td>${ele.title}</td>
            <td>$${ele.price}</td>
            <td>
                <button class="btn btn-sm btn-primary edit-btn" data-bs-toggle="modal" data-bs-target="#editCourseModal" data-id="${
                    ele._id
                }">Edit</button>
                <button class="btn btn-sm btn-danger delete-btn" data-id="${
                    ele._id
                }">Delete</button>
            </td>
            </tr>
        `;
        });
        // Add event listeners for Delete buttons
        const deleteBtn = document.querySelectorAll('.delete-btn');
        deleteBtn.forEach((btn) => {
            btn.addEventListener('click', deleteCourse);
        });
        // Add event listeners for Edit buttons
        const editBtn = document.querySelectorAll('.edit-btn');
        editBtn.forEach((btn) => {
            btn.addEventListener('click', editCourse);
        });
    })
    .catch((error) => console.error(error));

// Add new course
saveCourseBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const formData = new FormData(addCourseForm);
    const title = formData.get('title');
    const price = formData.get('price');

    fetch('http://localhost:3002/api/courses', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, price }),
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            location.reload();
        })
        .catch((error) => console.error(error));
});

// Delete course
function deleteCourse(e) {
    const courseId = e.target.getAttribute('data-id');
    fetch(`http://localhost:3002/api/courses/${courseId}`, {
        method: 'DELETE',
    })
        .then((res) => res.json())
        .then((data) => {
            // console.log(data);
            location.reload();
        })
        .catch((error) => console.error(error));

    deleteModal.addEventListener('show.bs.modal', (e) => {
        const courseId = e.relatedTarget.getAttribute('data-id');
        confirmDeleteBtn.addEventListener('click', () => {
            deleteCourse(courseId);
        });
    });
}

// Edit course
function editCourse(e) {
    const courseId = e.target.getAttribute('data-id');
    const editModal = document.getElementById('editCourseModal');
    const editForm = document.getElementById('edit-course-form');
    const titleInput = document.getElementById('edit-course-title');
    const priceInput = document.getElementById('edit-course-price');

    // Clear previous values
    titleInput.value = '';
    priceInput.value = '';

    fetch(`http://localhost:3002/api/courses/${courseId}`)
        .then((res) => res.json())
        .then((data) => {
            if (data.data) {
                titleInput.value = data.data.courses.title;
                priceInput.value = data.data.courses.price;
                editForm.setAttribute('data-id', courseId);
            } else {
                console.log('No course data found');
            }
        })
        .catch((error) => console.error(error));
}

// Update course
document.getElementById('update-course-btn').addEventListener('click', (e) => {
    e.preventDefault();
    const courseId = document
        .getElementById('edit-course-form')
        .getAttribute('data-id');
    const title = document.getElementById('edit-course-title').value;
    const price = document.getElementById('edit-course-price').value;
    fetch(`http://localhost:3002/api/courses/${courseId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, price }),
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            location.reload();
        })
        .catch((error) => console.error(error));
});

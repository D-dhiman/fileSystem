console.log("JS file is loaded");

document.querySelector("form").addEventListener("submit", async function (e) {
    e.preventDefault(); // Stop page reload

    const keyword = document.getElementById("keyword").value.trim();
    const bookDiv = document.getElementById("book");
    bookDiv.innerHTML = ""; // clear previous result

    if (!keyword) return;

    try {
        const response = await fetch(`http://localhost:3000/search?keyword=${encodeURIComponent(keyword)}`);
        const data = await response.json();

        if (!data.length) {
            bookDiv.innerHTML = "<p style='color:white;padding:1em;'>No books found.</p>";
            return;
        }

        data.forEach(book => {
            const bookInfo = document.createElement("div");
            bookInfo.style.color = "white";
            bookInfo.style.padding = "1em";
            bookInfo.innerHTML = `
                <h2>${book.title}</h2>
                <p><strong>Author:</strong> ${book.author}</p>
                <p><strong>Keywords:</strong> ${book.keywords.join(', ')}</p>
            `;

            if (book.pdfPath) {
                const viewer = document.createElement("iframe");
                viewer.src = `http://localhost:3000/${book.pdfPath}`;
                viewer.width = "100%";
                viewer.height = "400px";
                viewer.style.border = "1px solid #ccc";
                bookInfo.appendChild(viewer);
            }

            bookDiv.appendChild(bookInfo);
        });

    } catch (error) {
        bookDiv.innerHTML = `<p style="color:red;padding:1em;">Error fetching books. Check if your backend is running.</p>`;
        console.error(error);
    }
});
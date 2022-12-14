const getCom = document.querySelector("#select");
const getScore = document.querySelector("#input");
const getResult = document.querySelector("#submit");
const getSubjGroup = document.querySelector(".group");
const overlay = document.querySelector(".overlay");
const tbBody = document.querySelector(".tb-body");

let isDisplayed = 0;
const getAPI = async function (subjectName, score) {
    try {
        const res = await fetch(
            `https://api-university-2022.beecost.vn/university/university_suggestion?subject_group_name=${subjectName}&score=${score}`
        );
        if (!res.ok) {
            throw new Error(`Error ${res.status}`);
        } else {
            const data = await res.json();
            const listData = data.data.lst_suggestions;
            for (const univer of listData) {
                const html = `
        <tr class="tb">
          <td>${univer.university_name} (${univer.university_code})</td>
          <td>${univer.major_name} (${univer.major_code})</td>
          <td>${univer.entry_score}</td>
        </tr>
        `;
                tbBody.insertAdjacentHTML("beforeend", html);
            }
        }
    } catch (err) {
        alert(err.message);
    }
};

getResult.addEventListener("click", () => {
    if (!isDisplayed) {
        const header = `
        <tr>
          <th>Trường</th>
          <th>Ngành</th>
          <th>Điểm 2021</th>
        </tr>
    `;
        document
            .querySelector("thead")
            .insertAdjacentHTML("afterbegin", header);
        isDisplayed = 1;
    }
    const subjGroup = getCom.value;
    const score = getScore.value;
    document.querySelectorAll(".tb").forEach((e) => e.classList.add("hidden"));
    getAPI(subjGroup.toUpperCase(), score);
});

getCom.addEventListener("click", () => {
        getSubjGroup.classList.remove("hidden");
        overlay.classList.remove("hidden");
});

overlay.addEventListener("click", () => {
    overlay.classList.add("hidden");
    getSubjGroup.classList.add("hidden");
});

document.querySelectorAll(".subject-group").forEach((subject) => {
    subject.addEventListener("click", (e) => {
        getSubjGroup.classList.add("hidden");
        overlay.classList.add("hidden");
        getCom.value = e.target.textContent;
    });
});


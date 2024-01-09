const fileInput = document.getElementById('inpImg');
fileInput.addEventListener("change", uploadImageToCloudinary);

async function uploadImageToCloudinary() {
    const cloud_name = "duas1juqs";
    const upload_preset = "pnvimage";
    const fileInput = document.getElementById('inpImg');

    uploading_text.innerText = "Uploading ...";
    document.getElementById('uploadImg').style.display = 'none';

    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", upload_preset);

    const options = {
        method: "POST",
        body: formData,
    };

    try {
        const res = await fetch(
            `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
            options
        );
        const data = await res.json();
        document.getElementById('uploadImg').style.display = 'block';
        let linkImg = document.getElementById('image');
        linkImg.src = data.secure_url;
        console.log(linkImg);
        uploading_text.innerHTML = `
        <br />
        <img style="max-width:300px" src="${data.secure_url}" alt="${data.secure_url}">
        </center>`;
    } catch (err) {
        return console.log(err);
    }
}

var body = {
    userName: 'Fred',
    userEmail: 'Flintstone@gmail.com'
}

axios({
    method: 'post',
    url: '/blog',
    data: body
})
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });







function generateSlug(title) {
    let slug = title.toLowerCase();
    let newSlug = '';
    for (let i = 0; i < slug.length; i++) {
        const char = slug[i];
        if (/[^a-z0-9]/.test(char)) {
            newSlug += '-';
        } else {
            newSlug += char;
        }
    }
    newSlug = newSlug.replace(/^-+|-+$/g, '');
    newSlug = newSlug.replace(/-+/g, '-');
    return newSlug;
}

function removeVietnameseTones(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, "");
    str = str.replace(/\u02C6|\u0306|\u031B/g, "");
    str = str.replace(/ + /g, " ");
    str = str.trim();
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, " ");
    return str;
}

export const link = {
    uploadImageToCloudinary, linkImg
}

export const Slug = {
    generateSlug
}
export { removeVietnameseTones  };
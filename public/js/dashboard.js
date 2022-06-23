

    // const logOutBtn =  document.querySelector(".logout");

    // const logOutFunction = () => {
    //     // confirm("Are you sure you want to log out?");
    //     if(confirm("Are you sure you want to log out from admin panel?")){
    //     window.localStorage.removeItem("admin");
    //     window.location.href = "/admin/login";
    //     } else {
    //         return;
    //     }
    // }

    // logOutBtn.addEventListener("click", logOutFunction);

    const sidebar = document.querySelector(".sidebar")
    const menu = document.querySelector(".menu")
    const cancel = document.querySelector(".cancel")
    const totalUsers = document.querySelector(".totalUsers")
    const allWorks = document.querySelector(".allWorks")
    const totalApps = document.querySelector(".totalApps")

    menu.addEventListener("click", () => {
        cancel.classList.remove("hidden")
        menu.classList.add("hidden")
        sidebar.classList.remove("hidden")
        sidebar.classList.add("absolute")
    })
    cancel.addEventListener("click", () => {
        cancel.classList.add("hidden")
        menu.classList.remove("hidden")
        sidebar.classList.add("hidden")
        sidebar.classList.remove("absolute")
    })


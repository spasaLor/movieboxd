const btns = document.querySelectorAll('.delete');

btns.forEach(btn => {
    btn.addEventListener("click", async()=>{
    const postId= btn.dataset.post;
    const res = await fetch("/delete_post",{
        method:"DELETE",
        headers:{"Content-type": "application/json"},
        body:JSON.stringify({postId:postId})
    });
    if(res.ok){
        const data=await res.json();
        window.location.href= data.redirect;
    }
    else
        throw new Error("Fetch error");
});
});

console.log(btns);
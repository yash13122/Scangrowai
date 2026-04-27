const store_id = new URLSearchParams(location.search).get("store_id");

async function pay() {
    const amount = document.getElementById("amount").value;

    const res = await fetch(`http://localhost:8000/pay/${store_id}?amount=${amount}`);
    const data = await res.json();

    window.location.href = data.upi;
}

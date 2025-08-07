// 定義菜單項目、價格和初始數量
const menuItems = [
    { name: 'A', price: 12, quantity: 0 },
    { name: 'B', price: 28, quantity: 0 },
    { name: 'C', price: 18, quantity: 0 }
];

const menuContainer = document.getElementById('menu-items');
const totalPriceSpan = document.getElementById('total-price');

// 渲染菜單項目
function renderMenuItems() {
    menuContainer.innerHTML = ''; // 清空舊的內容
    menuItems.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'menu-item';
        itemDiv.innerHTML = `
            <div class="item-info">
                <p>${item.name}</p>
                <span>${item.price} 元</span>
            </div>
            <div class="controls">
                <button onclick="changeQuantity('${item.name}', -1)">-1</button>
                <span class="quantity-display" id="qty-${item.name}">${item.quantity}</span>
                <button onclick="changeQuantity('${item.name}', 1)">+1</button>
                <button onclick="changeQuantity('${item.name}', 5)">+5</button>
            </div>
        `;
        menuContainer.appendChild(itemDiv);
    });
    calculateTotal();
}

// 改變數量並重新計算總價
function changeQuantity(itemName, changeValue) {
    const item = menuItems.find(i => i.name === itemName);
    if (item) {
        item.quantity = Math.max(0, item.quantity + changeValue);
        document.getElementById(`qty-${itemName}`).innerText = item.quantity;
        calculateTotal();
    }
}

// 計算總金額
function calculateTotal() {
    let total = 0;
    menuItems.forEach(item => {
        total += item.price * item.quantity;
    });
    totalPriceSpan.innerText = total;
}

// 重設所有數量
function resetQuantities() {
    menuItems.forEach(item => {
        item.quantity = 0;
    });
    renderMenuItems();
}

// 網頁載入時呼叫
document.addEventListener('DOMContentLoaded', renderMenuItems);
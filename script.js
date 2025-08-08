// 定義菜單項目和價格
const menuItems = [
    { name: '餡餅', price: 35, quantity: 0 },
    { name: '蔥餅', price: 20, quantity: 0 },
    { name: '蛋餅', price: 30, quantity: 0 }
];

const menuContainer = document.getElementById('menu-items');
const totalPriceSpan = document.getElementById('total-price');

// 渲染菜單項目
function renderMenuItems() {
    menuContainer.innerHTML = '';
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

// 新增功能：從 URL 參數解析數量
function parseUrlParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.forEach((value, key) => {
        const item = menuItems.find(i => i.name === key);
        if (item) {
            item.quantity = parseInt(value, 10) || 0;
        }
    });
}

// 網頁載入時呼叫
document.addEventListener('DOMContentLoaded', () => {
    parseUrlParameters(); // 先解析 URL 參數
    renderMenuItems();    // 再根據解析後的數量來渲染頁面
});

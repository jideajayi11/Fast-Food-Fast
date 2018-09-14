document.querySelector('#menu-icon button').addEventListener('click', () => {
  const menu = document.querySelector('#menu-items').style.display;
  if (menu === 'block') {
    document.querySelector('#menu-items').style.display = 'none';
} else {
    document.querySelector('#menu-items').style.display = 'block';
}
});

document.querySelector('.bg-dim').addEventListener('click', () => {
  document.querySelector('#menu-items').style.display = 'none';
});

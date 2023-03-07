const triggerTabList = [].slice.call(document.querySelectorAll('#ex1-tabs-2'));
triggerTabList.forEach((triggerEl) => {
  const tabTrigger = new mdb.Tab(triggerEl);

  triggerEl.addEventListener('click', (event) => {
    event.preventDefault();
    tabTrigger.show();
  });
});
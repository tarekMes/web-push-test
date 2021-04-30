const publicVapidKey='BDWedh8dCCWap1gQawGp2xuMHhvJZ3KcqtKT8-zEhBMyfA8Stf-pERFmOAVZAkMAfNeS8tKwIuQmnvugCl3OTi8'
if ('serviceWorker' in navigator)   {
    send().catch(err=> console.error(err))
}

async function send() {
    console.log('resisitering Service Worker');
    const register = await navigator.serviceWorker.register('work.js', {
        scope:'/'
    })
    console.log('Service Worker registred');


    const convertedVapidKey = urlBase64ToUint8Array(publicVapidKey);
     
    await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: convertedVapidKey
    }).then(r=>{
        console.log(r);
        fetch('/subscribe', {
        method :'POST',
        body:JSON.stringify(r),
        headers: {
            'content-type' : 'application/json'
        }
    })
    }).catch(err=>console.error(err))
}

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');
 
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
 
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
import dynamic from 'umi/dynamic';

const delay = (timeout) => new Promise(resolve => setTimeout(resolve, timeout));
export default dynamic(async function() {
  await delay(/* 1s */1000);
  return () => <div>user Page</div>
});
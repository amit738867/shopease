

const url = `https://www.google.co.in/search?tbm=shop&hl=en-IN&gl=IN&sxsrf=ADLYWIKdLV67nG3ClA2rW82oudM480oBFg:1731853820232&psb=1&q=////////&tbs=mr:1,merchagg:g140768507%7Cg11214002%7Cg5443900089%7Cg5429560847%7Cg128568728%7Cg385715397%7Cg109116125%7Cg115107446%7Cg153457024%7Cg114495872%7Cm141020976%7Cm113996928%7Cm701307835%7Cm549386076%7Cm110131434%7Cm270239955%7Cm114178286%7Cm9705343%7Cm15925981%7Cm128636646%7Cm128653060%7Cm10736904%7Cm120089357%7Cm134836332%7Cm11995651%7Cm115713543%7Cm746614150%7Cm508910158%7Cm224682343%7Cm113499584%7Cm120890194%7Cm549370851%7Cm11050683%7Cm111514955%7Cm115915438%7Cm582498883%7Cm624817057%7Cm5453697451%7Cm527891813%7Cm518406332%7Cm116757378&sa=X&ved=0ahUKEwjEv4eeyuOJAxURUGwGHR52HOkQsysIhQ0oPQ&biw=1600&bih=783&dpr=1`

async function getProducts(url) {
    try {
      const response = await fetch(url);
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const jsonData = await response.json();
      
      return jsonData.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
  }


const searchEngine = async (searchQuery)=>{
// console.log(searchQuery)
let plusquery = searchQuery.split(' ').join('+');
let linkmade = `https://www.google.co.in/search?tbm=shop&hl=en-IN&gl=IN&sxsrf=ADLYWIKdLV67nG3ClA2rW82oudM480oBFg:1731853820232&psb=1&q=${plusquery}&tbs=mr:1,merchagg:g140768507%7Cg11214002%7Cg5443900089%7Cg5429560847%7Cg128568728%7Cg385715397%7Cg109116125%7Cg115107446%7Cg153457024%7Cg114495872%7Cm141020976%7Cm113996928%7Cm701307835%7Cm549386076%7Cm110131434%7Cm270239955%7Cm114178286%7Cm9705343%7Cm15925981%7Cm128636646%7Cm128653060%7Cm10736904%7Cm120089357%7Cm134836332%7Cm11995651%7Cm115713543%7Cm746614150%7Cm508910158%7Cm224682343%7Cm113499584%7Cm120890194%7Cm549370851%7Cm11050683%7Cm111514955%7Cm115915438%7Cm582498883%7Cm624817057%7Cm5453697451%7Cm527891813%7Cm518406332%7Cm116757378&sa=X&ved=0ahUKEwjEv4eeyuOJAxURUGwGHR52HOkQsysIhQ0oPQ&biw=1600&bih=783&dpr=1`
const mainUrl = `https://webapi-production-b2e2.up.railway.app/scrape?url=${encodeURIComponent(linkmade)}`



 let productList = await getProducts(mainUrl).then(data => {
                if (data) {
                  return data;
                return data;
                // Process the fetched JSON data here
                } else {
                console.log('Failed to fetch data.');
                }
            }
            )
            // console.log(productList)
            return productList;

}

module.exports = {
    searchEngine,
}
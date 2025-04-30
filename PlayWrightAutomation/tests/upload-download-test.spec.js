const ExcelJs = require('exceljs');
const {test, expect} = require('@playwright/test');



async function writeExcelDemo(searchText,replaceText,change,filePath){

    const workbook = new ExcelJs.Workbook();
    await workbook.xlsx.readFile(filePath)
    
        const worksheet = workbook.getWorksheet('Sheet1');
        const Output = await readExcel(worksheet,searchText);
    
    const cell = worksheet.getCell(Output.row,Output.column+change.colChange);
    // cell.value = 'Republicccc';
    cell.value = replaceText;
    await workbook.xlsx.writeFile(filePath);
        
    }
    
    async function readExcel(worksheet,searchText)
    {
    let ouptut = {row:-1,column:-1}       // avoid hardcoding by creating object with fixed values
        worksheet.eachRow((row,rowNumber) =>{
            row.eachCell((cell,colNumber)=>{
                // console.log(cell.value);
                if(cell.value == searchText){
                    // console.log(rowNumber);
                    // console.log(colNumber, cell.value);  
                    ouptut.row = rowNumber,
                    ouptut.column = colNumber
                }
            })
        })
        return ouptut;
    }

test('Upload download excel validation', async ({page})=>{
    const textSearch = 'Mango';
    const updateValue = '350';
    await page.goto('https://rahulshettyacademy.com/upload-download-test/');
const downloadPromise = page.waitForEvent('download'); 
    await page.getByRole('button',{name:'Download'}).click();
await downloadPromise;
    writeExcelDemo(textSearch,updateValue,{rowChange:0,colChange:2},"C:/Users/SGandhi/Downloads/download.xlsx")
    await page.locator('#fileinput').click();
    await page.locator('#fileinput').setInputFiles('C:/Users/SGandhi/Downloads/download.xlsx');
    const textlocator = page.getByText(textSearch);
    const desiredRow = await page.getByRole('row').filter({has: textlocator}) 
    await expect(desiredRow.locator('#cell-4-undefined')).toContainText(updateValue);


})

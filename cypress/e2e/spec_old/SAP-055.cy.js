// import { elements } from 'C:/Users/flinc/OneDrive/Desktop/folderAutomation/automation2/cypress/support/selectors.js';
import {beforeEach} from 'C:/Users/flinc/OneDrive/Desktop/folderAutomation/automation2/cypress/support/beforeEachSetup.js';
import { timeout } from 'rxjs';
import { generateRandomName, generateRandomNamesArray, generateRandomPhoneNumber } from 'C:/Users/flinc/OneDrive/Desktop/folderAutomation/automation2/cypress/support/nameAndPhone';

//for generating long text
const generateLongText = (length) => {
  const baseText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ";
  let longText = '';
  while (longText.length < length) {
    longText += baseText;
  }
  return longText.slice(0, length);
};


describe('setting-akun whatsapp', () => {
  before(() =>{
    cy.login('myUsername','myPassword');
  });
  
  it('should get all element in setting-akun whatsapp', () => {
    //nagivagasi ke riwayat broadcast
    beforeEach(()=>{
      beforeEachSetup();
    });
    cy.get('@settingNav').click();
    cy.get('@akunWhatsappNav').click();
    // Memastikan bahwa pengguna berada di halaman setting-akun whatsapp
    cy.wait(2000);
    beforeEach(()=>{
      beforeEachSetup();
    });
    cy.url().should('include', '/setting/account-whatsapp');
    cy.get('img').should('be.visible');
    
    // Assertions untuk memastikan elemen terlihat dan memiliki teks yang benar
    cy.get('@akunWhatsappTabDigunakan').click();
    cy.get('@akunWhatsappTabCadangan').click();
    cy.get('@akunWhatsappTabSuspended').click();
    cy.get('@akunWhatsappTabDigunakan').click();
    cy.get('@buttonTambahAkunWhatsapp').click();
    cy.get('@textboxNameTambahAkun').type('Your Name Here');
    cy.get('@textboxStatusTambahAkun').type('Your Name Here');
    cy.get('@textboxNomorHpTambahAkun').type('Your Name Here');
    cy.get('@radiobuttonGreetMsgTambahAkun').should('have.attr', 'aria-checked', 'false').click();
    // cy.get('button[role="tab"]', ).scrollIntoView().contains();  
    cy.contains('Cadangan').scrollIntoView();  
    cy.contains('Gunakan').scrollIntoView().click();
    cy.contains('Select Divisi').scrollIntoView().click();
    cy.get(".flex-1 .overflow-y-auto").should("be.visible");
    cy.get('p[class="font-semibold"]').contains('Ringkasan Akun');
    cy.contains('Your Name Here');
    cy.contains('Tambahkan Nomor');
    cy.screenshot('get elemen in setting akun whatsapp');
    cy.get('@buttonBatal').click();
    cy.wait(1000);

    // open form edit akun whatsapp
    cy.get('@buttonEditAkunWhatsapp').click();
    cy.get('@headLabelEditAkunWhatsapp').contains('Edit Akun'); // label edit akun
    cy.get('@labelInformasiAkunWhatsapp').contains('Informasi Akun'); //label Info akun
    cy.get('@labelFotoProfilAkunWhatsapp').contains('Foto Profil'); //label foto profile
    cy.get('@iconFotoProfilAkunWhatsapp').should('be.visible');//icon foto profile
    cy.get('@buttonEditFotoProfilAkunWhatsapp').should('be.visible');//.click().type('{esc}') -- button edit foto profile
    cy.get('@buttonDeleteFotoProfilAkunWhatsapp').should('be.visible'); //button delete profile
    cy.get('@labelNamaEditAkunWhatsapp').contains('Nama'); //label text nama
    cy.get('@textboxNamaEditAkunWhatsapp').should('be.visible');// textbox nama
    cy.get('@labelStatusEditAkunWhatsapp').contains('Status');//label status
    cy.get('@textboxStatusEditAkunWhatsapp').should('be.visible'); //textbox status
    cy.get('@labelNomorWaEditAkunWhatsapp').contains('Nomor WhatsApp');//label nomor whatsapp
    cy.get('@textboxNomorWaEditAkunWhatsapp').should('be.visible');//textbox nomor whatsapp
    cy.get('@labelPesanPembukaEditAkunWhatsapp').contains('Pesan Pembuka');//label greeting message
    cy.get('@radiobuttonGreetMsgTambahAkun').should('be.visible');//radio button greeting message
    cy.get('@posisiAkunEditAkunWhatsapp').contains('Posisi Akun');//label posisi akun
    cy.get('@tabGunakanPosisiAkun').contains('Gunakan'); //tab digunakan
    cy.get('@tabCadanganPosisiAkun').contains('Cadangan'); //tab cadangan
    cy.get('@labelPilihDivisi').contains('Divisi'); //label divisi
    cy.get('@comboboxPilihDivisi').should('be.visible'); //textbox divisi
    cy.get('@labelStatuAktifasiAkunWhatsapp').contains('Status Akun'); //label status akun
    cy.get('@statusAktifasiAkunWhatsapp').then(($element) => {
      const text = $element.text();
    
      if (text.includes('Aktif') || text.includes('Tidak Aktif')) {
        cy.log('Text found: ' + text);
        return cy.wrap($element);
      } else {
        cy.log('Neither "Aktif" nor "Tidak Aktif" found.');
      }
    }); //status akun
    cy.get('@buttonBatal').click();
    //action delete akun whatsapp
    cy.get('@buttoneElipsisAkunWhatsapp').click();
    cy.get('@buttonDeleteAkunWhatsapp').click();
    cy.get('@labelHapusAkunAkunWhatsapp').contains('Hapus Grup');
    cy.get('@labelKonfirmasiHapusAkunWhatsapp').should('be.visible');
    cy.get('@labelKonfirmasi2HapusAkunWhatsapp').should('be.visible');
    cy.get('@labelKonfirmasi3HapusAkunWhatsapp').should('be.visible');
    cy.get('@checkboxKonfirmasiHapusAkunWhatsapp').click();
    cy.get('@labelCheckboxKonfirmasiHapusAkunWhatsapp').should('be.visible');
    cy.get('@buttonBatalDeleteAkunWhatsapp').contains('Batal');
    cy.get('@buttonKonfirmasiDeleteAkunWhatsapp').contains('Hapus');

    //lupa lagi fungsinya
    // function getElementAddress($el) {
    //   let path = '';
    //   let current = $el;
    
    //   while (current.length) {
    //     let tagName = current.prop('tagName');
    //     if (!tagName) break; // Ensure the tagName exists before proceeding
    
    //     tagName = tagName.toLowerCase();
    //     let id = current.attr('id') ? `#${current.attr('id')}` : '';
    //     let classes = current.attr('class') ? `.${current.attr('class').trim().replace(/\s+/g, '.')}` : '';
        
    //     path = `${tagName}${id}${classes} > ${path}`;
    //     current = current.parent();
    //   }
    
    //   return path.slice(0, -3); // Remove the last ' > ' from the path
    // }
    
    // cy.get('div[role="dialog"]').within(() => {
    //   // Select all elements within the modal
    //   cy.get('*').each(($el, index) => {
    //     const element = Cypress.$($el);
    
    //     // Ensure the element exists and is valid
    //     if (element.length) {
    //       // Build the element's address (CSS selector)
    //       const elementAddress = getElementAddress(element);
    
    //       // Print the element index, tag name, and address
    //       cy.log(`Element ${index + 1}: ${element.prop('tagName')}`);
    //       cy.log(`Address: ${elementAddress}`);
    
    //       // Print the text content of the element
    //       cy.log(`Text: ${element.text().trim()}`);
    
    //       // Extract and print all data attributes
    //       const dataAttributes = element.get(0).attributes;
    //       for (let i = 0; i < dataAttributes.length; i++) {
    //         const attr = dataAttributes[i];
    //         if (attr.name.startsWith('data-')) {
    //           cy.log(`${attr.name}: ${attr.value}`);
    //         }
    //       }
    
    //       // Log the element, its data attributes, and address to the console for detailed inspection
    //       console.log(`Element ${index + 1}:`, element[0]);
    //       console.log('Element Address:', elementAddress);
    //       console.log('Data Attributes:', element.data());
    //     } else {
    //       cy.log(`Element ${index + 1} is undefined or invalid.`);
    //     }
    //   });
    // });
  
  })
})
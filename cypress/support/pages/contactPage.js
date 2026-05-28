import { timeout } from "async";

const baseUrl = Cypress.config('baseUrl');

class contactPage {
    elementCheckingContactPage(){
        // cy.softAssert(cy.contactNav().click(),'navigate to group chat');
        cy.wait(1000);
        cy.url().then((url) => {
            if (url === "https://dev.example.test/contact") {
                cy.wait(1000);
                cy.log('success direct to contact page')
            } else {
                cy.log('failed direct to contact page')
            }
        })
        cy.softAssert(cy.userLoginNameLabel().click(),'User section setting');
        cy.document().wait(800).trigger('keydown', { key: 'Escape' });
        cy.softAssert(cy.contact_head_label().contains('Contact'),'check head label Contact page');
        cy.softAssert(cy.contact_sub_label().contains('Semua Kontak'),'check sub label Contact page');
        cy.softAssert(cy.contact_tab_block().contains('Diblokir').click(),'Contact page > Diblokir tab');
        cy.softAssert(cy.contact_tab_contact().contains('Kontak').click(),'Contact page > kontak tab');
        cy.softAssert(cy.searchbar().should('be.visible')
            .type('typing test')
            .clear(),'Contact page > searchbar');
        cy.softAssert(cy.dateFIlter().should('be.visible').click(),'Contact page > filter tanggal');
        cy.document().trigger('keydown', { key: 'Escape' });
        cy.wait(800);
        cy.softAssert(cy.combo_filter().should('be.visible').click(),'Contact page > filter divisi dan label');
        // cy.softAssert(cy.combo_filter_divisi().should('be.visible').click(),'Contact page > filter divisi dan label > dropdown divisi');
        // cy.softAssert(cy.combo_filter_label().should('be.visible').click(),'Contact page > filter divisi dan label > dropdown label');
        cy.document().trigger('keydown', { key: 'Escape' });
        cy.softAssert(cy.cell_name_customer().should('be.visible').eq(0).click(),'Contact page > customer name');
        cy.softAssert(cy.cell_createdAt().should('be.visible').eq(0).click(),'Contact page > created at');
        cy.softAssert(cy.cell_whatsapp().should('be.visible').eq(0).click(),'Contact page > whatsapp number');
        cy.softAssert(cy.cell_name_division().should('be.visible').eq(0).click(),'Contact page > division');
        cy.softAssert(cy.cell_label().should('be.visible').eq(0).click(),'Contact page > label');
        cy.softAssert(cy.cell_roomHistory().should('be.visible').eq(0),'Contact page > room history');
        cy.softAssert(cy.cell_actions().should('be.visible').eq(0),'Contact page > action section');
        cy.softAssert(cy.cell_actions_update().should('be.visible').eq(0).click(),'Contact page > open modal update');
        // cy.softAssert(cy.modal_update_customer().should('be.visible'),'update Contact > form update modal');
        // cy.softAssert(cy.foto_profil().should('be.visible'),'update Contact > foto profile');
        // cy.softAssert(cy.update_profil().should('be.visible'),'update Contact > button edit profile');
        // cy.softAssert(cy.delete_profil().should('be.visible'),'update Contact > button delete profile');
        // cy.softAssert(cy.x_button_update_customer().should('be.visible'),'update Contact > close button modal update profile');
        // cy.softAssert(cy.container_nama().should('be.visible'),'update Contact > customer name section');
        // cy.softAssert(cy.container_nomor().should('be.visible'),'update Contact > number whatsapp section');
        // cy.softAssert(cy.container_label().should('be.visible'),'update Contact > label section');
        // cy.softAssert(cy.button_simpan().should('be.visible'),'update Contact > action simpan');
        // cy.softAssert(cy.button_batal().should('be.visible'),'update Contact > action batal');
        cy.softAssert(cy.cell_actions_delete().should('be.visible').eq(0).click(),'Contact page > open delete');
        cy.softAssert(cy.cell_actions_delete_button().should('be.visible').eq(0).click(),'Contact page > click delete');
        // cy.softAssert(cy.modal_delete().should('be.visible'),'Contact page > modal delete validation');
        // cy.softAssert(cy.modal_delete_hapus().should('be.visible'),'Contact page > modal delete validation > hapus');
        // cy.softAssert(cy.modal_delete_batal().should('be.visible'),'Contact page > modal delete validation > batal hapus');
    }

    navigateToContactPage(){
        cy.softAssert(cy.contactNav().click(),'navigate to group chat')
    }
}

export default contactPage;
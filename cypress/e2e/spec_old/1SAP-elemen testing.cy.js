// import { elements } from '/cypress/support/selectors.js';
import {beforeEach} from '/cypress/support/beforeEachSetup.js';
import { timeout } from 'rxjs';

describe('Main Element Test', ()=>{
  //Element testing Dashboard
  before(() =>{
    cy.login_dev_by_username('myUsername','myPassword');
  });

 
  it('should get all element on Dashboard', () => {
    beforeEach(()=>{
      beforeEachSetup();
    });
    cy.get('@dashboardNav',{timeout:20000}).should('be.visible').click();
    // beforeEachSetup();
    /* ==== Generated with Cypress Studio ==== */
    // cy.get('@dashboardNav').click();
    // Memastikan bahwa pengguna berada di halaman Dashboard
    cy.url().should('include', '/');
    cy.get('img').should('be.visible'); //logo produk (SAP)
    
    // Assertions untuk memastikan elemen terlihat dan memiliki teks yang benar
    cy.get('@dashboardNav').should('be.visible').contains('Dashboard');
    cy.get('@inboxNav').should('be.visible').contains('Inbox');
    cy.get('@broadcastNav').should('be.visible').contains('Broadcast');
    cy.get('@contactNav').should('be.visible').contains('Contact');
    cy.get('@settingNav').should('be.visible').contains('Pengaturan');
    cy.get('@headerDashboard').should('be.visible').contains('Dashboard');
    cy.get('@dashboardDatePicker').should('be.visible');
    cy.get('@dashboardFilterGrup').should('be.visible');
    cy.get('@dashboardFilterDivisi').should('be.visible');
    cy.get('@statusOnlineUserDashboard').should('be.visible');
    cy.get('@nameAgentSettingDashboard').should('be.visible');
    cy.get('@broadcastCardDashboard').should('be.visible').contains('Broadcast');
    cy.get('@totalAtBroadcastCard').should('be.visible').contains('Total Broadcast');
    cy.get('@buttonCekRiwayatBC').should('be.visible').contains('Cek Riwayat Broadcast');
    cy.get('@totalDeliveredCard').should('be.visible').contains('Pesan Berhasil Dikirim');
    cy.get('@totalInboundCard').should('be.visible').contains('Respon Inbound');
    cy.get('@totalPendingCard').should('be.visible').contains('Total Pending');
    cy.get('@totalFailedCard').should('be.visible').contains('Pesan Gagal Kirim');
    //di hide dulu untuk demo
    // cy.get('@headerAgentAnaliticDashboard').should('be.visible').contains('Agent');
    // cy.get('@tabOverviewAllAgent').should('be.visible').contains('Overview');
    // cy.get('@tabOverviewPerAgent').should('be.visible').contains('Per Agent');
    // cy.get('@waitingTimeFirstRespodAgent').scrollIntoView().should('be.visible').contains('Waiting Time for First Respond by Hour');
    // cy.get('@avgReplyTimeAgent').should('be.visible').scrollIntoView().contains('Average Reply Time by Hour');
    // cy.get('body > main > main > section > div.sticky.top-0.z-50.flex.items-center.justify-between.border-b-\[1px\].bg-background.p-4 > div.flex.items-center.gap-4 > div > div.h-min > button > svg').should('be.visible');
    
    //take screenshoot
    cy.screenshot('elemen testing Dashboard');
    // beforeEach(()=>{
    //   beforeEachSetup();
    // });
    // beforeEachSetup();
    /* ==== End Cypress Studio ==== */
  });

  describe('Element testing Inbox', ()=>{
    before(() =>{
      cy.login('myUsername','myPassword');
    });
    

    it('should get all elemen on inbox',() =>{
      // beforeEachSetup();
      beforeEach(()=>{
        beforeEachSetup();
      });
      cy.get('@inboxNav').click();
      cy.url().should('include', '/inbox');
      cy.get('img').should('be.visible');
      beforeEach(()=>{
        beforeEachSetup();
      });
      // cy.get('').as('UserList'); blm ada data cy
  
      //input text pada InputMsgBox buat munculin button send
      cy.get('@dashboardNav').should('be.visible').contains('Dashboard');
      cy.get('@inboxNav').should('be.visible').contains('Inbox');
      cy.get('@broadcastNav').should('be.visible').contains('Broadcast');
      cy.get('@contactNav').should('be.visible').contains('Contact');
      cy.get('@settingNav').should('be.visible').contains('Pengaturan');

      // cy.get('@inputMsgBox',{timeout: 10000}).click().type('a');//trigger untuk buttonSend showed
      // cy.get('form.flex > .inline-flex').as('buttonSend').click(); //harus di get terpisah
      // cy.get('').as('Divisi'); gabs get element blm ada data cy

      // Assertions untuk memastikan elemen terlihat dan memiliki teks yang benar
      cy.get('@unassignedTab').should('be.visible').click();
      cy.get('@buttonHandover').should('be.visible').contains('Handover');
      cy.get('@buttonAssign').should('be.visible').contains('Assign');
      cy.get('@searchBox').should('be.visible');
      cy.get('@labelStatus').should('be.visible');
      cy.get('@ongoingTab').should('be.visible');
      cy.get('@resolvedTab').should('be.visible');
      // cy.get('@UserList').should('be.visible');  //gabs get element blm ada data cy
      cy.get('@historyMsgContainer').should('be.visible');
      cy.get('@buttonAttch').should('be.visible');
      cy.get('@chatDetailTab').should('be.visible').click();
      cy.get('@propsTab').should('be.visible').click();
      cy.get('@chatDetailTab').should('be.visible').click();
      // cy.get('@Divisi').should('be.visible'); //gabs get element blm ada data cy
      cy.get('@agentLabelProp').should('be.visible');
      cy.get('@labelTag').should('be.visible');
      cy.get('@tglCaseDibuat').should('be.visible');
      cy.get('@tglCaseStart').should('be.visible');
      cy.get('@tglCaseSolved').should('be.visible');
      cy.get('@commentSection').should('be.visible');
      cy.get('@roomHistoryTab').scrollIntoView().should('be.visible');
      cy.get('@ongoingTab').click();
      cy.get('@listChat_first').click();

      //take screenshot at inbox
      cy.wait(2000);
      cy.screenshot('elemen testing Inbox');
      beforeEach(()=>{
        beforeEachSetup();
      });
      // beforeEachSetup();
    });

    // describe('Element testing Broadcast-Riwayat',()=>{
    //   before(() =>{
    //     cy.login('myUsername','myPassword');
    //   });
      
    //   it('should get all element in Broadcast-Riwayat', () => {
    //     beforeEach(()=>{
    //       beforeEachSetup();
    //     });
    //     cy.get('@broadcastNav').click();
    //     cy.get('@broadcastRiwayatNav').click();
    //     // cy.wait(2000);
    //     beforeEach(()=>{
    //       beforeEachSetup();
    //     });
    //     // beforeEachSetup();
    //     cy.get('@headerBroadcastRiwayat').should('be.visible').contains('Riwayat');
    //     cy.get('@riwayatBroadcastDatePicker').should('be.visible');
    //     // cy.get('riwayatBroadcastFilterStatus').should('be.visible').contains('Semua Status');
    //     // cy.get('riwayatBroadcastFilterGrup').should('be.visible').contains('Semua Grup');
    //     // cy.get('riwayatBroadcastFilterDivisi').should('be.visible').contains('Semua Divisi');
    //     cy.get('@containerContentRiwayat').should('be.visible');
    //     cy.get('@containerContentRIwayat_detailRiwayat').should('be.visible');
    //     cy.get('@detailRiwayatAtBroadcast').should('be.visible').contains('Detail Riwayat');
    //     cy.get('@tanggalDetailRiwayatBroadcast').should('be.visible').contains('Tanggal');
    //     cy.get('@asalAkunKustomerBroadcast').should('be.visible').contains('Dari');
    //     cy.get('@namaKustomerBroadcast').should('be.visible').contains('Ke');
    //     cy.get('@divisiAsalKustomerBroadcast').should('be.visible').contains('Divisi');
    //     cy.get('@grupDivisiKustomerBroadcast').should('be.visible').contains('Grup');
    //     cy.get('@pesanStatusPaketBroadcast').should('be.visible').should('include.text', 'Paket Sedang');
    //     cy.get('@awbNumberAtBroadcast');
    //     cy.wait(2000);
    //     cy.screenshot('elemen testing Broadcast-Riwayat');
    //     beforeEach(()=>{
    //       beforeEachSetup();
    //     });
    //     // beforeEachSetup();
    //   });
      
    //   describe('Element testing Broadcast-Template',()=>{
    //     before(() =>{
    //       cy.login('myUsername','myPassword');
    //     });
    //     it('should get all element at template broadcast',()=>{
    //       beforeEach(()=>{
    //         beforeEachSetup();
    //       });
    //       cy.get('@broadcastNav').click();
    //       cy.get('@broadcastTemplateNav').click();
    //       // cy.wait(2000);
    //       beforeEach(()=>{
    //         beforeEachSetup();
    //       });
    //       cy.get('@headerBroadcastTemplate',{timeout:20000}).should('be.visible');
    //       cy.get('@searchboxBroadcastTemplate').should('be.visible');
    //       cy.get('@templateBroadcastDatePicker').should('be.visible');
    //       cy.get('@buttonEditParameterTemplateBroadcast').should('be.visible');
    //       cy.get('@containerBtmNavPanel').should('be.visible');
    //       cy.wait(2000);
    //       cy.screenshot('elemen testing template broadcast');
    //       beforeEach(()=>{
    //         beforeEachSetup();
    //       });
    //       // beforeEachSetup();
    //     })
    //   });
    // });
  });
})
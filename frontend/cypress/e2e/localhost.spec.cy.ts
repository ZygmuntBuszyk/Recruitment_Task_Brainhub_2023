describe('localhost testing', () => {
	const timeout = 5000;
	const coins = ['Bitcoin', 'Wrapped Bitcoin', 'Bitcoin Cash', 'Bitcoin SV', 'Bitcoin Gold'];
	const coinTags = ['bitcoin', 'wrapped-bitcoin', 'bitcoin-cash', 'bitcoin-cash-sv', 'bitcoin-gold'];

	beforeEach(() => {
		cy.visit('http://localhost:3000/');
	});

	it('Should type  text in input and have correct result in the options list', () => {
		cy.get('[data-cy="multiSelect"]').type(coins[0]);
		cy.get('#multiSelect').should('have.value', coins[0]);

		coins.forEach(coin => {
			cy.get('.ant-select-item-option-content', { timeout }).contains(coin);
		});
	});

	it('Should choose a coin show tab, tab content with chart', () => {
		cy.get('[data-cy="multiSelect"]').type(coins[0]);
		cy.get('#multiSelect').should('have.value', coins[0]);

		cy.get('.ant-select-item-option-content', { timeout }).contains(coins[0]).click();

		cy.get('.ant-select-selection-overflow-item .ant-tag').contains(coinTags[0]);
		cy.get('.ant-tabs-tab').contains(coins[0]);
		cy.get('.ant-tabs-tabpane').find('canvas');
	});

	it('Should not be able to pick more than 5 coins', () => {
		cy.get('[data-cy="multiSelect"]').type('Bitcoin');
		cy.get('#multiSelect').should('have.value', 'Bitcoin');

		coins.forEach((coin, index) => {
			cy.get('.ant-select-item-option-content', { timeout }).contains(coin).click();

			cy.get('.ant-select-selection-overflow-item .ant-tag').contains(coinTags[index]);
		});

		const overflowedCoin = {
			name: 'Bitcoin Diamond',
			tag: 'bitcoin-diamond'
		};

		cy.get('.ant-select-item-option-content', { timeout }).contains(overflowedCoin.name).click();
		cy.get('.ant-select-selection-overflow-item .ant-tag').contains(overflowedCoin.tag).should('not.exist');
	});

	it('Should choose coin and reload a browser and coin should be still chosen and chart should be visible', () => {
		cy.get('[data-cy="multiSelect"]').type(coins[0]);
		cy.get('#multiSelect').should('have.value', coins[0]);

		cy.get('.ant-select-item-option-content', { timeout }).contains(coins[0]).click();

		cy.get('.ant-select-selection-overflow-item .ant-tag').contains(coinTags[0]);

		cy.visit('http://localhost:3000/');

		cy.get('.ant-select-selection-overflow-item .ant-tag').contains(coinTags[0]);
		cy.get('.ant-tabs-tab').contains(coins[0]);
		cy.get('.ant-tabs-tabpane').find('canvas');
	});
});

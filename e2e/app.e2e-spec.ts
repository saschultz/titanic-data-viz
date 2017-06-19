import { TitanicDataVizPage } from './app.po';

describe('titanic-data-viz App', () => {
  let page: TitanicDataVizPage;

  beforeEach(() => {
    page = new TitanicDataVizPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});

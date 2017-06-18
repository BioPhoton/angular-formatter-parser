import { TestAngularFormatterParserPage } from './app.po';

describe('test-angular-formatter-parser App', () => {
  let page: TestAngularFormatterParserPage;

  beforeEach(() => {
    page = new TestAngularFormatterParserPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});

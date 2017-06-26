import { AFPPage } from './app.po';

describe('a-f-p App', () => {
  let page: AFPPage;

  beforeEach(() => {
    page = new AFPPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});

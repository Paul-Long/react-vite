import {Overview} from '@/views/Overview';
import {Page} from '@trade/components/page';
import {Content} from '@trade/components/page/Content';

export function AccountView() {
  return (
    <Page>
      <Content>
        <div className="flex flex-col w-1200px mx-auto">
          <Overview />
        </div>
      </Content>
    </Page>
  );
}

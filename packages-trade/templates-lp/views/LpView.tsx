import {Filters} from '@/views/Filters';
import {Page} from '@trade/components/page';
import {Content} from '@trade/components/page/Content';

export function LpView() {
  return (
    <Page>
      <Content>
        <div className="flex flex-col w-1200px mx-auto">
          <Filters />
        </div>
      </Content>
    </Page>
  );
}

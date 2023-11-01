import {
  Badge,
  Button,
  SideNavigation,
  SpaceBetween,
} from '@cloudscape-design/components';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ModalCreateSession from './ModalCreateSession';
import useLsSessionList from 'src/hooks/useLsSessionList';

export default function NavSide() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeHref, setActiveHref] = useState(location.pathname);
  const [modalVisible, setModalVisible] = useState(false);
  const { lsSessionList } = useLsSessionList();
  const { sessionId } = useParams();

  useEffect(() => {
    setActiveHref(location.pathname);
  }, [location, sessionId]);

  return (
    <SideNavigation
      // header={{ text: 'Sessions', href: '' }}
      header={{ text: 'Smart Search', href: '' }}
      activeHref={activeHref}
      onFollow={(event) => {
        if (!event.detail.external) {
          event.preventDefault();
          navigate(event.detail.href);
        }
      }}
      items={[
        {
          type: 'section',
          text: 'Sessions',
          items: lsSessionList,
        },
        {
          type: 'link',
          text: '',
          href: '',
          info: (
            <SpaceBetween size="s">
              <Button
                onClick={() => setModalVisible(true)}
                iconName="insert-row"
                iconAlign="right"
              >
                Create a new session
              </Button>
              <ModalCreateSession
                dismissModal={() => setModalVisible(false)}
                modalVisible={modalVisible}
              />
            </SpaceBetween>
          ),
        },
        { type: 'divider' },
        {
          type: 'link',
          text: 'Add language models',
          href: '/add-language-models',
        },
        {
          type: 'link',
          text: 'Upload files',
          href: '/upload-files',
        },
        { type: 'divider' },
        {
          type: 'link',
          text: 'Notifications',
          href: '#/notifications',
          info: <Badge color="red">23</Badge>,
        },
        {
          type: 'link',
          text: 'Documentation',
          href: 'https://gitlab.aws.dev/aws-gcr-industrysolution/smart_search/-/blob/main/README.md',
          external: true,
        },
      ]}
    />
  );
}

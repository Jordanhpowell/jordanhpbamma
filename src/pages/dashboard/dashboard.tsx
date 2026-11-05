import React from 'react';
import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/hooks/useStore';
import { useDevice } from '@deriv-com/ui';
import OnboardTourHandler from '../tutorials/dbot-tours/onboarding-tour';
import Announcements from './announcements';
import Cards from './cards';
import InfoPanel from './info-panel';

type TMobileIconGuide = {
    handleTabChange: (active_number: number) => void;
};

const DashboardComponent = observer(({ handleTabChange }: TMobileIconGuide) => {
    const { load_modal, dashboard, client } = useStore();
    const { dashboard_strategies } = load_modal;
    const { is_onboarding_tour_active, setActiveTour } = dashboard;
    const { isDesktop, isTablet } = useDevice();
    const has_dashboard_strategies = !!dashboard_strategies?.length;
    const active_tour = is_onboarding_tour_active ? 'onboarding' : undefined;

    return (
        <React.Fragment>
            <div className={classNames('tab__dashboard', { 'tab__dashboard--tour-active': active_tour })}>
                <div className='tab__dashboard__content'>
                    {client.is_logged_in && (
                        <Announcements is_mobile={!isDesktop} is_tablet={isTablet} handleTabChange={handleTabChange} />
                    )}
                    <div className='quick-panel'>
                        <Cards has_dashboard_strategies={has_dashboard_strategies} />
                        <InfoPanel />
                    </div>
                </div>
            </div>
            {active_tour && <OnboardTourHandler setActiveTour={setActiveTour} is_active={!!active_tour} />}
        </React.Fragment>
    );
});

export default DashboardComponent;

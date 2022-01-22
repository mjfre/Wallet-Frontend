import React, { Component } from 'react';

import ModuleRepositoryBarChart from './ModuleRepositoryBarChart';
import ChartContainer from './ChartContainer';

class ModuleRepositoryCharts extends Component {

    render() {

        const { moduleRepositoryInfo } = this.props;

        const level0Data = [
            {
                x: 'module 0',
                y: moduleRepositoryInfo.level0Repositories.module0.durationDays,
                url: moduleRepositoryInfo.level0Repositories.module0.htmlUrl,
                createdAt: moduleRepositoryInfo.level0Repositories.module0.createdAt,
                updatedAt: moduleRepositoryInfo.level0Repositories.module0.updatedAt
            },
            {
                x: 'module 1',
                y: moduleRepositoryInfo.level0Repositories.module1.durationDays,
                url: moduleRepositoryInfo.level0Repositories.module1.htmlUrl,
                createdAt: moduleRepositoryInfo.level0Repositories.module1.createdAt,
                updatedAt: moduleRepositoryInfo.level0Repositories.module1.updatedAt
            },
            {
                x: 'module 2',
                y: moduleRepositoryInfo.level0Repositories.module2.durationDays,
                url: moduleRepositoryInfo.level0Repositories.module2.htmlUrl,
                createdAt: moduleRepositoryInfo.level0Repositories.module2.createdAt,
                updatedAt: moduleRepositoryInfo.level0Repositories.module2.updatedAt
            },
            {
                x: 'module 3',
                y: moduleRepositoryInfo.level0Repositories.module3.durationDays,
                url: moduleRepositoryInfo.level0Repositories.module3.htmlUrl,
                createdAt: moduleRepositoryInfo.level0Repositories.module3.createdAt,
                updatedAt: moduleRepositoryInfo.level0Repositories.module3.updatedAt
            },
            {
                x: 'module 4',
                y: moduleRepositoryInfo.level0Repositories.module4.durationDays,
                url: moduleRepositoryInfo.level0Repositories.module4.htmlUrl,
                createdAt: moduleRepositoryInfo.level0Repositories.module4.createdAt,
                updatedAt: moduleRepositoryInfo.level0Repositories.module4.updatedAt
            },
            {
                x: 'module 5',
                y: moduleRepositoryInfo.level0Repositories.module5.durationDays,
                url: moduleRepositoryInfo.level0Repositories.module5.htmlUrl,
                createdAt: moduleRepositoryInfo.level0Repositories.module5.createdAt,
                updatedAt: moduleRepositoryInfo.level0Repositories.module5.updatedAt
            }
        ];

        const level1Data = [
            {
                x: 'module 0',
                y: moduleRepositoryInfo.level1Repositories.module0.durationDays,
                url: moduleRepositoryInfo.level1Repositories.module0.htmlUrl,
                createdAt: moduleRepositoryInfo.level1Repositories.module0.createdAt,
                updatedAt: moduleRepositoryInfo.level1Repositories.module0.updatedAt
            },
            {
                x: 'module 1',
                y: moduleRepositoryInfo.level1Repositories.module1.durationDays,
                url: moduleRepositoryInfo.level1Repositories.module1.htmlUrl,
                createdAt: moduleRepositoryInfo.level1Repositories.module1.createdAt,
                updatedAt: moduleRepositoryInfo.level1Repositories.module1.updatedAt
            },
            {
                x: 'module 2',
                y: moduleRepositoryInfo.level1Repositories.module2.durationDays,
                url: moduleRepositoryInfo.level1Repositories.module2.htmlUrl,
                createdAt: moduleRepositoryInfo.level1Repositories.module2.createdAt,
                updatedAt: moduleRepositoryInfo.level1Repositories.module2.updatedAt
            },
            {
                x: 'module 3',
                y: moduleRepositoryInfo.level1Repositories.module3.durationDays,
                url: moduleRepositoryInfo.level1Repositories.module3.htmlUrl,
                createdAt: moduleRepositoryInfo.level1Repositories.module3.createdAt,
                updatedAt: moduleRepositoryInfo.level1Repositories.module3.updatedAt
            },
            {
                x: 'module 4',
                y: moduleRepositoryInfo.level1Repositories.module4.durationDays,
                url: moduleRepositoryInfo.level1Repositories.module4.htmlUrl,
                createdAt: moduleRepositoryInfo.level1Repositories.module4.createdAt,
                updatedAt: moduleRepositoryInfo.level1Repositories.module4.updatedAt
            }
        ];

        const level2Data = [
            {
                x: 'module 0',
                y: moduleRepositoryInfo.level2Repositories.module0.durationDays,
                url: moduleRepositoryInfo.level2Repositories.module0.htmlUrl,
                createdAt: moduleRepositoryInfo.level2Repositories.module0.createdAt,
                updatedAt: moduleRepositoryInfo.level2Repositories.module0.updatedAt
            },
            {
                x: 'module 1',
                y: moduleRepositoryInfo.level2Repositories.module1.durationDays,
                url: moduleRepositoryInfo.level2Repositories.module1.htmlUrl,
                createdAt: moduleRepositoryInfo.level2Repositories.module1.createdAt,
                updatedAt: moduleRepositoryInfo.level2Repositories.module1.updatedAt
            },
            {
                x: 'module 2',
                y: moduleRepositoryInfo.level2Repositories.module2.durationDays,
                url: moduleRepositoryInfo.level2Repositories.module2.htmlUrl,
                createdAt: moduleRepositoryInfo.level2Repositories.module2.createdAt,
                updatedAt: moduleRepositoryInfo.level2Repositories.module2.updatedAt
            },
            {
                x: 'processing snake',
                y: moduleRepositoryInfo.level2Repositories.processingSnake.durationDays,
                url: moduleRepositoryInfo.level2Repositories.processingSnake.htmlUrl,
                createdAt: moduleRepositoryInfo.level2Repositories.processingSnake.createdAt,
                updatedAt: moduleRepositoryInfo.level2Repositories.processingSnake.updatedAt
            },
            {
                x: 'league invaders',
                y: moduleRepositoryInfo.level2Repositories.leagueInvaders.durationDays,
                url: moduleRepositoryInfo.level2Repositories.leagueInvaders.htmlUrl,
                createdAt: moduleRepositoryInfo.level2Repositories.leagueInvaders.createdAt,
                updatedAt: moduleRepositoryInfo.level2Repositories.leagueInvaders.updatedAt
            },
            {
                x: 'game',
                y: moduleRepositoryInfo.level2Repositories.game.durationDays,
                url: moduleRepositoryInfo.level2Repositories.game.htmlUrl,
                createdAt: moduleRepositoryInfo.level2Repositories.game.createdAt,
                updatedAt: moduleRepositoryInfo.level2Repositories.game.updatedAt
            }
        ];

        const level3Data = [
            {
                x: 'module 0',
                y: moduleRepositoryInfo.level3Repositories.module0.durationDays,
                url: moduleRepositoryInfo.level3Repositories.module0.htmlUrl,
                createdAt: moduleRepositoryInfo.level3Repositories.module0.createdAt,
                updatedAt: moduleRepositoryInfo.level3Repositories.module0.updatedAt
            },
            {
                x: 'module 1',
                y: moduleRepositoryInfo.level3Repositories.module1.durationDays,
                url: moduleRepositoryInfo.level3Repositories.module1.htmlUrl,
                createdAt: moduleRepositoryInfo.level3Repositories.module1.createdAt,
                updatedAt: moduleRepositoryInfo.level3Repositories.module1.updatedAt
            },
            {
                x: 'module 2',
                y: moduleRepositoryInfo.level3Repositories.module2.durationDays,
                url: moduleRepositoryInfo.level3Repositories.module2.htmlUrl,
                createdAt: moduleRepositoryInfo.level3Repositories.module2.createdAt,
                updatedAt: moduleRepositoryInfo.level3Repositories.module2.updatedAt
            },
            {
                x: 'module 3',
                y: moduleRepositoryInfo.level3Repositories.module3.durationDays,
                url: moduleRepositoryInfo.level3Repositories.module3.htmlUrl,
                createdAt: moduleRepositoryInfo.level3Repositories.module3.createdAt,
                updatedAt: moduleRepositoryInfo.level3Repositories.module3.updatedAt
            }
        ];

        const level4Data = [
            {
                x: 'module 0',
                y: moduleRepositoryInfo.level4Repositories.module0.durationDays,
                url: moduleRepositoryInfo.level4Repositories.module0.htmlUrl,
                createdAt: moduleRepositoryInfo.level4Repositories.module0.createdAt,
                updatedAt: moduleRepositoryInfo.level4Repositories.module0.updatedAt
            },
            {
                x: 'module 1',
                y: moduleRepositoryInfo.level4Repositories.module1.durationDays,
                url: moduleRepositoryInfo.level4Repositories.module1.htmlUrl,
                createdAt: moduleRepositoryInfo.level4Repositories.module1.createdAt,
                updatedAt: moduleRepositoryInfo.level4Repositories.module1.updatedAt
            },
            {
                x: 'module 2',
                y: moduleRepositoryInfo.level4Repositories.module2.durationDays,
                url: moduleRepositoryInfo.level4Repositories.module2.htmlUrl,
                createdAt: moduleRepositoryInfo.level4Repositories.module2.createdAt,
                updatedAt: moduleRepositoryInfo.level4Repositories.module2.updatedAt
            },
            {
                x: 'module 3',
                y: moduleRepositoryInfo.level4Repositories.module3.durationDays,
                url: moduleRepositoryInfo.level4Repositories.module3.htmlUrl,
                createdAt: moduleRepositoryInfo.level4Repositories.module3.createdAt,
                updatedAt: moduleRepositoryInfo.level4Repositories.module3.updatedAt
            },
            {
                x: 'module 4',
                y: moduleRepositoryInfo.level4Repositories.module4.durationDays,
                url: moduleRepositoryInfo.level4Repositories.module4.htmlUrl,
                createdAt: moduleRepositoryInfo.level4Repositories.module4.createdAt,
                updatedAt: moduleRepositoryInfo.level4Repositories.module4.updatedAt
            }
        ];

        const level5Data = [
            {
                x: 'module 0',
                y: moduleRepositoryInfo.level5Repositories.module0.durationDays,
                url: moduleRepositoryInfo.level5Repositories.module0.htmlUrl,
                createdAt: moduleRepositoryInfo.level5Repositories.module0.createdAt,
                updatedAt: moduleRepositoryInfo.level5Repositories.module0.updatedAt
            },
            {
                x: 'module 1',
                y: moduleRepositoryInfo.level5Repositories.module1.durationDays,
                url: moduleRepositoryInfo.level5Repositories.module1.htmlUrl,
                createdAt: moduleRepositoryInfo.level5Repositories.module1.createdAt,
                updatedAt: moduleRepositoryInfo.level5Repositories.module1.updatedAt
            },
            {
                x: 'module 2',
                y: moduleRepositoryInfo.level5Repositories.module2.durationDays,
                url: moduleRepositoryInfo.level5Repositories.module2.htmlUrl,
                createdAt: moduleRepositoryInfo.level5Repositories.module2.createdAt,
                updatedAt: moduleRepositoryInfo.level5Repositories.module2.updatedAt
            },
            {
                x: 'module 3',
                y: moduleRepositoryInfo.level5Repositories.module3.durationDays,
                url: moduleRepositoryInfo.level5Repositories.module3.htmlUrl,
                createdAt: moduleRepositoryInfo.level5Repositories.module3.createdAt,
                updatedAt: moduleRepositoryInfo.level5Repositories.module3.updatedAt
            },
            {
                x: 'module 4',
                y: moduleRepositoryInfo.level5Repositories.module4.durationDays,
                url: moduleRepositoryInfo.level5Repositories.module4.htmlUrl,
                createdAt: moduleRepositoryInfo.level5Repositories.module4.createdAt,
                updatedAt: moduleRepositoryInfo.level5Repositories.module4.updatedAt
            }
        ];

        return <span>
            <ChartContainer>
                <ModuleRepositoryBarChart data={level0Data} title='Level 0 Repositories' />
            </ChartContainer>
            <ChartContainer>
                <ModuleRepositoryBarChart data={level1Data} title='Level 1 Repositories' />
            </ChartContainer>
            <ChartContainer>
                <ModuleRepositoryBarChart data={level2Data} title='Level 2 Repositories' />
            </ChartContainer>
            <ChartContainer>
                <ModuleRepositoryBarChart data={level3Data} title='Level 3 Repositories' />
            </ChartContainer>
            <ChartContainer>
                <ModuleRepositoryBarChart data={level4Data} title='Level 4 Repositories' />
            </ChartContainer>
            <ChartContainer>
                <ModuleRepositoryBarChart data={level5Data} title='Level 5 Repositories' />
            </ChartContainer>
        </span>

    }
}

export default ModuleRepositoryCharts;
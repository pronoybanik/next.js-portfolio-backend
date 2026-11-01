import { Request, Response, NextFunction } from 'express';
import PortfolioSettings, { defaultPortfolioData } from './portfolio.model';

const sanitizeData = (incomingData: unknown) => {
  if (!incomingData || typeof incomingData !== 'object') {
    return defaultPortfolioData;
  }

  const current = incomingData as Record<string, unknown>;

  return {
    ...defaultPortfolioData,
    ...current,
    header: {
      ...defaultPortfolioData.header,
      ...(typeof current.header === 'object' && current.header ? current.header : {}),
    },
    sectionStyles: {
      ...defaultPortfolioData.sectionStyles,
      ...(typeof current.sectionStyles === 'object' && current.sectionStyles ? current.sectionStyles : {}),
    },
    education: Array.isArray(current.education) ? current.education : defaultPortfolioData.education,
    experience: Array.isArray(current.experience) ? current.experience : defaultPortfolioData.experience,
    skills: Array.isArray(current.skills) ? current.skills : defaultPortfolioData.skills,
    softSkills: Array.isArray(current.softSkills) ? current.softSkills : defaultPortfolioData.softSkills,
  };
};

export const getPortfolioSettings = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    let settings = await PortfolioSettings.findOne();

    if (!settings) {
      settings = await PortfolioSettings.create({ data: defaultPortfolioData });
    }

    res.status(200).json({
      success: true,
      message: 'Portfolio settings fetched successfully',
      data: settings.data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch portfolio settings',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const updatePortfolioSettings = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const mergedData = sanitizeData(req.body);

    const settings = await PortfolioSettings.findOneAndUpdate(
      {},
      { data: mergedData },
      { new: true, upsert: true, runValidators: true },
    );

    res.status(200).json({
      success: true,
      message: 'Portfolio settings updated successfully',
      data: settings.data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update portfolio settings',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

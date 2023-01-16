import { Injectable } from '@angular/core';
import { NavItemDto } from '../../dtos/nav -item';
import { NavMenuDto } from '../../dtos/nav-menue';

@Injectable({
  providedIn: 'root'
})
export class NavService {

  constructor() { }
  getNavMenu(){
return new NavMenuDto('NavMenu',[
  new NavItemDto(' Volunteer Profile','local_activity','/tech/tech-profile','Tech'),
  new NavItemDto('Volunteer Requests','local_activity','/tech/preview-request','Tech'),
  new NavItemDto('Companies List','local_activity','/ngo/Ngo-list','Tech'),
  new NavItemDto('Companies  Activity','local_activity','/tech/previewActivityList','Tech'),
  new NavItemDto('Company Profile','local_activity','/ngo/Ngo-profile','Ngo'),
  new NavItemDto('Companies Activity','local_activity','/ngo/activity-list','Ngo'),
  new NavItemDto('Create Activity','local_activity','/ngo/create-activity','Ngo'),
  new NavItemDto('Volunteers List','local_activity','/tech/Technologist-list','Ngo'),
  new NavItemDto('Volunteers Requests','local_activity','/ngo/approve-request','Ngo'),

]);
  }
}

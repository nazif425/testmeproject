import closeCircleOutline from "@iconify-icons/mdi/close-circle-outline";
import dotsVertical from "@iconify-icons/mdi/dots-vertical";
import logout from "@iconify-icons/mdi/logout";
import cogOutline from "@iconify-icons/mdi/cog-outline";
import clipboardCheckOutline from "@iconify-icons/mdi/clipboard-check-outline";
import bulletinBoard from "@iconify-icons/mdi/bulletin-board";
import cardAccountDetailsOutline from "@iconify-icons/mdi/card-account-details-outline";
import monitorEdit from "@iconify-icons/mdi/monitor-edit";
import menu from "@iconify-icons/mdi/menu";
import account from '@iconify-icons/mdi/account';
import accountGroup from '@iconify-icons/mdi/account-group';
import home from '@iconify-icons/mdi/home';
import viewDashboard from '@iconify-icons/mdi/view-dashboard';
import monitoredit from '@iconify-icons/mdi/monitor-edit';
import roundAdd from '@iconify-icons/ic/round-add';
import roundMinus from '@iconify-icons/ic/round-minus';
import roundClose from '@iconify-icons/ic/round-close';
import roundKeyboardArrowDown from '@iconify-icons/ic/round-keyboard-arrow-down';
import roundDelete from '@iconify-icons/ic/round-delete';
import contacts from '@iconify-icons/mdi/contacts';
import download from '@iconify-icons/mdi/download-outline';
import list from '@iconify-icons/mdi/format-list-bulleted';
import settings from '@iconify-icons/mdi/settings-box';
import functionVariant from '@iconify-icons/mdi/function-variant';
import arrowLeftThick from '@iconify-icons/mdi/arrow-left-thick';
import arrowRightThick from '@iconify-icons/mdi/arrow-right-thick';
import call from '@iconify-icons/mdi/call';
import chat from '@iconify-icons/mdi/chat';
import facebook from '@iconify-icons/mdi/facebook';
import gmail from '@iconify-icons/mdi/gmail';

function addIcons(iconifyIcon) {
  iconifyIcon.addIcon("close-circle-outline", closeCircleOutline  )
  iconifyIcon.addIcon("dots-vertical", dotsVertical )
  iconifyIcon.addIcon("logout", logout )
  iconifyIcon.addIcon( "cog-outline", cogOutline)
  iconifyIcon.addIcon("clipboard-check-outline", clipboardCheckOutline )
  iconifyIcon.addIcon("bulletin-board", bulletinBoard )
  iconifyIcon.addIcon("card-account-details-outline", cardAccountDetailsOutline )
  iconifyIcon.addIcon("monitor-edit", monitorEdit )
  iconifyIcon.addIcon("menu", menu )
  iconifyIcon.addIcon('account', account );
  iconifyIcon.addIcon('account-group', accountGroup );
  iconifyIcon.addIcon('home', home );
  iconifyIcon.addIcon('view-dashboard', viewDashboard );
  iconifyIcon.addIcon('monitor-edit', monitoredit );
  iconifyIcon.addIcon('round-add', roundAdd );
  iconifyIcon.addIcon('round-minus', roundMinus );
  iconifyIcon.addIcon('round-close', roundClose );
  iconifyIcon.addIcon('round-keyboard-arrow-down', roundKeyboardArrowDown );
  iconifyIcon.addIcon('contacts', contacts );
  iconifyIcon.addIcon('round-delete', roundDelete);
  iconifyIcon.addIcon('download', download);
  iconifyIcon.addIcon('format-list-bulleted', list);
  iconifyIcon.addIcon('settings-box', settings);
  iconifyIcon.addIcon('function-variant', functionVariant)
  iconifyIcon.addIcon('arrow-left-thick',  arrowLeftThick)
  iconifyIcon.addIcon('arrow-right-thick', arrowRightThick)
  iconifyIcon.addIcon('call', call)
  iconifyIcon.addIcon('chat', chat)
  iconifyIcon.addIcon('facebook', facebook)
  iconifyIcon.addIcon('gmail', gmail)
}/* */

export default addIcons;
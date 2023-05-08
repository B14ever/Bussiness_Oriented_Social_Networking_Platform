const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    color:'#fff',
    backgroundColor: alpha(theme.palette.common.black, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.black, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));
  const StyledSideBar = styled(Drawer)(({ theme }) => ({
    drawer: {
      marginTop: theme.spacing(4), // set margin top as per your requirement
      width: 240,
    },
  }));
<Grid item sm={6} lg={4} xs={9}>
<Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search…"
        inputProps={{ 'aria-label': 'search' }}
      />
</Search>
<Box  component="nav">
           <Drawer anchor='right' variant="temporary" open={mobileOpen} onClose={handleDrawerToggle}
            ModalProps={{keepMounted: true}}
            sx={{display: { xs: 'block', sm: 'none' },'& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }}}>
            <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <List>
                {navItems.map((item) => (
                  <ListItem key={item} disablePadding>
                    <ListItemButton sx={{ }}>
                      <ListItemText primary={item} />
                    </ListItemButton>
                  </ListItem>
                ))}
            </List>
           </Box>
           </Drawer>
         </Box>
</Grid>
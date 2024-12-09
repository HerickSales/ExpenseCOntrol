
using ExpenseControl.Data.Dto;
using ExpenseControl.Services;
using Microsoft.AspNetCore.Mvc;

namespace ExpenseControl.Controller
{

    [Route("[controller]")]
    [ApiController]
    [Produces("application/json")]

    //Fazer token e hashear senha
    public class UserController(UnitOfService service) : ControllerBase
    {
        private UnitOfService _service = service;

        [HttpPost("Register")]
        public ActionResult Register(CreateUserDto dto)
        {
            try
            {
                var result = _service.UserService.Register(dto);
                if (result.IsSuccess)
                {
                    return Ok(result.Successes.FirstOrDefault());
                }
                return BadRequest(result.Errors.FirstOrDefault());
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }   
        
        [HttpPost("Login")]
        public ActionResult Login(LoginUserDto dto)
        {
            try
            {
                var result = _service.UserService.Login(dto);
                if (result.IsSuccess)
                {
                    return Ok(result.Successes.FirstOrDefault());
                }
                return BadRequest(result.Errors.FirstOrDefault());
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        
        [HttpGet("{id}/People")]
        public ActionResult GetPeople(int id)
        {         
            try
            {
                var result = _service.UserService.GetPeople(id);
                if (result.IsSuccess)
                {
                    return Ok(result.Successes.FirstOrDefault());
                }
                return BadRequest(result.Errors.FirstOrDefault());
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}